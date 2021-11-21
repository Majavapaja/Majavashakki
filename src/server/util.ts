export const isProd = () => process.env.NODE_ENV === "production"

export const removeFalsy = xs => xs.filter(x => !!x)
