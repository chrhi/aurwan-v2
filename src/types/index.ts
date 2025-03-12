/* eslint-disable @typescript-eslint/no-explicit-any */
export type Product = {
  id: string;
  status: string;
  price: number;
  title: string;
  media: string;
  createdAt: any;
};

export type Order = {
  id: string;
  status: string;
  price: number;
  title: string;
  media: string;
  createdAt: any;
};

export type LocationItem = {
  id: number;
  commune_name_ascii: string;
  commune_name: string;
  daira_name_ascii: string;
  daira_name: string;
  wilaya_code: string;
  wilaya_name_ascii: string;
  wilaya_name: string;
};

export type Wilaya = {
  code: string;
  name_ascii: string;
  name: string;
};

export type Commune = {
  id: number;
  name_ascii: string;
  name: string;
  daira_name_ascii: string;
  daira_name: string;
};
