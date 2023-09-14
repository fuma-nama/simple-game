const cookie = "level_cookie";

type Data = {
  level: number;
};

function encode(data: Data): string {
  return encodeURIComponent(JSON.stringify(data));
}

export function decode(data: string): Data {
  return {
    level: 0,
    ...JSON.parse(data),
  };
}

export function get(): Data | null {
  const name = cookie + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return decode(c.substring(name.length, c.length));
    }
  }

  return null;
}

export function set(data: Data) {
  console.log(decodeURIComponent(document.cookie));
  document.cookie = `${cookie}=${encode(
    data
  )}; expires=Fri, 31 Dec 9999 21:10:10 GMT; path=/`;
}

export { cookie as cookie_name };
