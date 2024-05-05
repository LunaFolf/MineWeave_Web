type urlParams = {
  [key: string]: string | number | boolean
}

type jsonResponse = {
  [key: string]: any
}

function convertToUrlParams(params?: urlParams): URLSearchParams {
  const urlParams = new URLSearchParams()

  urlParams.set('_client', 'msgbrowser.net (by Dev_Whiskers [1385819])')

  if (!params) return urlParams

  for (const [key, value] of Object.entries(params)) {
    urlParams.set(key, value.toString())
  }

  return urlParams
}

export async function get(url: string, params?: urlParams): Promise<jsonResponse> {
  const urlParams = convertToUrlParams(params)
  const response = await fetch(url + '?' + new URLSearchParams(urlParams))

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  const data: jsonResponse = await response.json()

  return data
}
