export interface BaseCourse {
  name: string;
  code: string;
  description: string;
  semester: number;
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

export interface BaseInitialState {
  isLoading: boolean;
  search: string;
  isActionLoading: boolean;
  isActionSuccess: boolean;
  isError: boolean;
}

export interface LabelValue {
  label: string;
  value: string;
}
