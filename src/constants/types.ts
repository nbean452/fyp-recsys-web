import React from "react";

import { MenuProps } from "antd";

export interface BaseCourse {
  name: string;
  code: string;
  title: string;
  description: string;
  availability: string[3];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface BaseRating {
  id: number;
  rating: number;
  comment: string;
  created_at: string;
  updated_at: string;
}

export interface BaseUser {
  id: number;
  last_login: string;
  is_superuser: boolean;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  is_staff: boolean;
  is_active: boolean;
  date_joined: string;
}

export interface CourseWithRating extends BaseCourse {
  ratings: Omit<BaseRating, "course">[];
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
