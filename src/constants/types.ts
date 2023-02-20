import React from "react";

import { MenuProps } from "antd";

export interface BaseCourse {
  id: number;
  name: string;
  code: string;
  title: string;
  prerequisites: string[];
  description: string;
  availability: [string, string, string];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface BaseReview {
  id: number;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BaseUser {
  id: number;
  username: string;
  isSuperuser: boolean;
  firstName: string;
  lastName: string;
  email: string;
  isStaff: boolean;
  isActive: boolean;
  dateJoined: Date;
  lastLogin: Date;
}

export interface ReviewWithUser extends BaseReview {
  user: BaseUser;
}

export interface CourseWithReview extends BaseCourse {
  reviews: ReviewWithUser[];
}
export interface UserDetail extends BaseUser {
  takenCourse: CourseWithReview[];
}

export interface LabelValue {
  label: string;
  value: string;
}

export interface Pagination {
  limit: number;
  offset: number;
}

export interface Filter {
  filter: string;
}

export type SetStateType<T> = React.Dispatch<React.SetStateAction<T>>;

export interface HeaderType {
  menuItems: MenuProps["items"];
  setShowLogin: SetStateType<boolean>;
  setShowRegister: SetStateType<boolean>;
}
