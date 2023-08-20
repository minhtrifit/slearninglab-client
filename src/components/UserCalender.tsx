import { useState, useEffect, useCallback } from "react";
import { Button, Space } from "antd";
import FullCalendar from "@fullcalendar/react";
import { formatDate } from "@fullcalendar/core/index.js";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch } from "../redux/hooks/hooks";
import { RootState } from "../redux/store";
import { toast } from "react-toastify";
import { v4 } from "uuid";

import { transformDate2 } from "../helpers/transform";

import { INITIAL_EVENTS, createEventId } from "../utils/event";

import {
  updateCalenderList,
  getCalenderByUsername,
} from "../redux/reducers/task.reducer";

const UserCalendar = () => {
  const [weekendsVisible, setWeekendsVisible] = useState<boolean>(true);
  const [currentEvents, setCurrentEvents] = useState<any[]>([]);

  const isSaving = useSelector<RootState, boolean>(
    (state) => state.task.isSaving
  );

  const isLoading = useSelector<RootState, boolean>(
    (state) => state.task.isLoading
  );

  const username = useSelector<RootState, string>(
    (state) => state.user.username
  );

  const calenderList = useSelector<RootState, any[] | undefined>(
    (state) => state.task.calenderList
  );

  const dispatch = useDispatch();
  const dispatchAsync = useAppDispatch();

  const handleGetCalenderList = async () => {
    await dispatchAsync(getCalenderByUsername(username));
  };

  useEffect(() => {
    if (username !== undefined) {
      handleGetCalenderList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  const renderSidebarEvent = (event: any) => {
    return (
      <Space key={event.id} className="flex flex-col items-start">
        <Space>
          <b>
            {formatDate(event.start, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </b>
          <i>{event.title}</i>
        </Space>
      </Space>
    );
  };

  const renderSidebar = () => {
    return (
      <div className="p-5">
        <Space size="middle" className="flex flex-col items-start">
          <h2>Lưu lịch hẹn của bạn:</h2>
          <Space size="middle" className="flex flex-col items-start">
            <p>Nhấn vào ngày cần để đặt lịch hẹn mới.</p>
            <p>Kéo thả & thay đổi kích thước giờ lịch hẹn.</p>
            <p>Nhấn chọn lịch hẹn để xóa.</p>
            <Space>
              <input
                type="checkbox"
                checked={weekendsVisible}
                onChange={handleWeekendsToggle}
              ></input>
              Chuyển đổi cuối tuần
            </Space>
          </Space>
        </Space>
        <Space size="middle" className="flex flex-col items-start mt-10">
          <h2>Tất cả sự kiện: ({currentEvents.length})</h2>
          <div>{currentEvents.map(renderSidebarEvent)}</div>
        </Space>
      </div>
    );
  };

  const handleWeekendsToggle = () => {
    setWeekendsVisible(!weekendsVisible);
  };

  const handleDateSelect = (selectInfo: any) => {
    const title = prompt("Please enter a new title for your event");
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  };

  const handleEventClick = (clickInfo: any) => {
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  };

  const handleEvents = (events: any) => {
    setCurrentEvents(events);
  };

  const renderEventContent = (eventInfo: any) => {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    );
  };

  const handleUpdateCalender = async () => {
    const calenderList = currentEvents.map((event) => {
      return {
        title: event._def.title,
        publicId: event._def.publicId,
        start: transformDate2(event._instance.range.start),
        end: transformDate2(event._instance.range.end),
      };
    });

    const data = {
      calenderList: calenderList,
      username: username,
    };

    const rs = await dispatchAsync(updateCalenderList(data));

    if (rs.type === "task/update_calender_list/fulfilled") {
      toast.success("Lưu thành công");
    } else {
      toast.error("Lưu thất bại");
    }
  };

  return (
    <div className="mt-32">
      <div className="w-[80%] mb-10 mx-auto flex justify-end">
        <Button
          type="primary"
          onClick={() => {
            handleUpdateCalender();
          }}
        >
          Lưu thay đổi
        </Button>
      </div>
      {!isLoading && calenderList !== undefined && (
        <div className="w-[80%] min-h-[100%] flex flex-col lg:flex-row mx-auto justify-between">
          {renderSidebar()}
          <div className="w-[280px] md:w-[500px] xl:w-[700px]">
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                // right: "dayGridMonth,timeGridWeek,timeGridDay",
                right: "",
              }}
              initialView="dayGridMonth"
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              weekends={weekendsVisible}
              initialEvents={calenderList} // alternatively, use the `events` setting to fetch from a feed
              select={handleDateSelect}
              eventContent={renderEventContent} // custom render function
              eventClick={handleEventClick}
              eventsSet={handleEvents} // called after events are initialized/added/changed/removed
              // You can update a remote database when these fire:
              // eventAdd={function () {}}
              // eventChange={function () {}}
              // eventRemove={function () {}}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCalendar;
