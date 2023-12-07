import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Thông số cá nhân",
    },
  },
};

const UserChart = (props: any) => {
  const { countAttendance, countResult, countCalender, countTask } = props;

  const labels = [
    "Lớp học tham gia",
    "Số bài thi đã làm",
    "Số lịch hẹn",
    "Số ghi chú",
  ];

  const data = {
    labels,
    datasets: [
      {
        data: [countAttendance, countResult, countCalender, countTask],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
      },
    ],
  };

  return (
    <div className="mt-24">
      <Bar options={options} data={data} />
    </div>
  );
};

export default UserChart;
