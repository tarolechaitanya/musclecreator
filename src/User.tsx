export interface User {
  _id: string;  // Assuming _id is used as it is the default MongoDB identifier
  name: string;
  age: number;  // or string, depending on how you handle it in your API
  // Add other fields like height, weight, etc., if they are to be used
}