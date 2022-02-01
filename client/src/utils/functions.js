export const mapEnumObject = (label, enumList) => {
  let obj = {};

  for (let enumItem of enumList) {
    if (label === enumItem.enum) {
      obj = enumItem;
    }
  }
  return obj;
};
