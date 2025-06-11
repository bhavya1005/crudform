export interface User {
  /** Full name of the employee */
  name: string;
  /** Unique employee identifier */
  id: string;
  /** Salary in USD */
  salary: number;
  /** Department name (e.g. HR, Engineering) */
  department: string;
  /** 10-digit phone number */
  phone: string;
  /** Postal code */
  pincode: string;
  /** Full address */
  address: string;
}
