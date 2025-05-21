import React from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  AreaChart,
  Area,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import Orders from "../Orders/Orders";
import "./Dashboard.scss";

const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];

const data = [
  { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
  { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Page G", uv: 3490, pv: 4300, amt: 2100 }
];

const getPath = (x, y, width, height) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
  Z`;
};

const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props;
  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

const Dashboard = () => {
  return (
    <div className="dashboard">
      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="card">
          <h4>Total Customers</h4>
          <p className="number">1,250</p>
        </div>
        <div className="card">
          <h4>Total Products</h4>
          <p className="number">320</p>
        </div>
        <div className="card">
          <h4>Total Orders</h4>
          <p className="number">980</p>
        </div>
      </div>

      {/* Charts */}
      <div className="charts">
        <div className="chart">
          <h4>New Customers</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Bar
                dataKey="uv"
                shape={<TriangleBar />}
                label={{ position: "top" }}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart">
          <h4>New Orders</h4>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
        {/* Orders Table below charts */}
      <div className="orders-section">
        <h3> Recent Orders</h3>
<Orders showSearch={false} showPagination={false} rowLimit={5}/>


      </div>
    </div>
  );
};

export default Dashboard;
