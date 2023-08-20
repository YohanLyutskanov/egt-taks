import {User, UserFormValues} from "../data-types/user";

export const mapUserFormDataToUser = (data: UserFormValues, user: User): User => {
    const {name, email, phone, street, username, suite, city} = data
    return {
        ...user,
        name,
        username,
        phone,
        email,
        address: {
            ...user.address,
            city,
            suite,
            street
        }
    }
}