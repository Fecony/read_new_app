export type Option = {
    value: string;
    label: string;
};

export type SettingsFormFields = {
    sources: Option[];
    categories: Option[];
    authors: Option[];
};

export type SettingsFormFieldPayload = {
    sources: string[];
    categories: string[];
    authors: string[];
};

export type RegistrationFormFields = {
    email: string;
    password: string;
    password_confirmation: string;
};

export type LoginFormFields = {
    email: string;
    password: string;
};
