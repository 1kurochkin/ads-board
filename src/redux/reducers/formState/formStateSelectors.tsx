import { FormReducerFieldsType, FormReducerPagesType } from "./formState"

export const getFieldsByPageFormReducerSelector = (state: any, page: FormReducerPagesType) => state.formState[page]
// export const getIsValidByFieldFormReducerSelector = (state: any, field: FormReducerFieldsType) => state.formState[field].isValid
