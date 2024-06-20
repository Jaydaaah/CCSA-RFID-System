import schoolConfig from "../School-config.json";

export function CreateValidationForNextUI(
    regex: string,
    validatioErrorMsg: string,
    error_color:
        | "default"
        | "primary"
        | "secondary"
        | "success"
        | "warning"
        | "danger",
    normal_color?:
        | "default"
        | "primary"
        | "secondary"
        | "success"
        | "warning"
        | "danger"
): [
    (text: string) => boolean,
    (text: string) => "default" | "primary" | "secondary" | "success" | "warning" | "danger",
    (text: string) => string | null
] {
    function validationFn(text: string) {
        if (text == "") return false;
        return !RegExp(regex).test(text);
    }
    function colorFn(text: string) {
        return (validationFn(text) || (text == "")) ? error_color : normal_color ?? "default";
    }
    function validatioErrorFn(text: string) {
        return (validationFn(text) || (text == "")) ? validatioErrorMsg : null
    }
    return [validationFn, colorFn, validatioErrorFn];
}

export const [
    stdNameValidation,
    stdNameValidationColor,
    stdNameValidationError,
] = CreateValidationForNextUI(
    schoolConfig.stdNameRegex,
    "",
    "danger"
);

export const [ccsaIDValidation, ccsaIDValidationColor, ccsaIDValidationError] =
    CreateValidationForNextUI(
        schoolConfig.ccsaIDRegex,
        "",
        "danger"
    );

export const [
    rfidTagValidation,
    rfidTagValidationColor,
    rfidTagValidationError,
] = CreateValidationForNextUI(
    schoolConfig.rfidTagRegex,
    "",
    "danger"
);
