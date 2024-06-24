export interface IDivision {
  id: string;
  name: string;
  bn_name: string;
  lat: string;
  long: string;
}

export interface IDistrict {
  id: string;
  division_id: string;
  name: string;
  bn_name: string;
  lat: string;
  long: string;
}

export interface ISubDistrict {
  id: string;
  district_id: string;
  name: string;
  bn_name: string;
}
