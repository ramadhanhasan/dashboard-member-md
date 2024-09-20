export const formDataBuilder = (
  formData: FormData,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any,
  parentKey = '',
) => {
  if (data == null) {
    return
  }

  if (Array.isArray(data)) {
    data.forEach((el, index) => {
      formDataBuilder(formData, el, parentKey + `[${index}]`)
    })
  } else if (typeof data === 'object' && !(data instanceof File)) {
    Object.keys(data).forEach(key => {
      formDataBuilder(
        formData,
        data[key],
        parentKey ? `${parentKey}[${key}]` : key,
      )
    })
  } else {
    const value =
      typeof data === 'boolean' || typeof data === 'number'
        ? data.toString()
        : data
    formData.append(parentKey, value)
  }
}
