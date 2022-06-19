interface SwitchOption {
    value: boolean;
    viewValue: string;
}

const switchOptions: SwitchOption[] = [
    { value: true, viewValue: 'ON' },
    { value: false, viewValue: 'OFF' },
];


export {
    switchOptions,
    SwitchOption
};