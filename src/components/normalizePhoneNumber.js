export default normalizePhone = (value) => {
    if (!value) {
        return value;
    }
    const numberValue = value.replace(/[^\d]/g, '');
    if (numberValue.length <= 3) {
        return numberValue;
    }
    if (numberValue.length <= 7) {
        return `${numberValue.slice(0, 3)}.${numberValue.slice(3)}`;
    }
    return `${numberValue.slice(0, 3)}.${numberValue.slice(3, 6)}.${numberValue.slice(6, 10)}`;
};
