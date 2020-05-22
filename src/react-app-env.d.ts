/// <reference types="react-scripts" />
declare module "*.png" {
  const value: any;
  export = value;
}

declare module "*.module.scss" {
  const classes: { [key: string]: string };
  export default classes;
}
