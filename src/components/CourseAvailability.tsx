import React from "react";

import { Col, Table } from "antd";
import type { ColumnsType } from "antd/es/table";

interface DataType {
  semesterOne: string;
  semesterTwo: string;
  semesterThree: string;
}

const columns: ColumnsType<DataType> = [
  {
    dataIndex: "semesterOne",
    key: "semesterOne",
    title: "Semester 1",
  },
  {
    dataIndex: "semesterTwo",
    key: "semesterTwo",
    title: "Semester 2",
  },
  {
    dataIndex: "semesterThree",
    key: "semesterThree",
    title: "Summer Term",
  },
];

const formAvailabilityData = (
  unparsedAvailability: [string, string, string],
): [DataType] => [
  {
    semesterOne: unparsedAvailability[0],
    semesterThree: unparsedAvailability[2],
    semesterTwo: unparsedAvailability[1],
  },
];

interface CourseAvailabilityProps {
  unparsedAvailability: [string, string, string];
}

const CourseAvailability = ({
  unparsedAvailability,
}: CourseAvailabilityProps): JSX.Element => {
  const data = formAvailabilityData(unparsedAvailability);
  return (
    <Col lg={8} md={12} sm={24}>
      <Table columns={columns} dataSource={data} pagination={false} />
    </Col>
  );
};

export default CourseAvailability;
