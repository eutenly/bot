import UserRequest, { UserRequestParameter } from "./UserRequest";

export type ParameterTypes = string | number | boolean;

export default function getParameter<ParameterType extends ParameterTypes>(userRequest: UserRequest, name: string): ParameterType | undefined {

    // Get parameter
    return userRequest.parameters.find((p: UserRequestParameter) => p.name === name)?.value as ParameterType | undefined;
}