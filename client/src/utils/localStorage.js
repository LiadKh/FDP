const localStorageEmail = 'FDP-EMAIL';
const localStorageToken = 'FDP-TOKEN';
const localStoragePassword = 'FDP-PASSWORD';

export const saveToLocalStorage = ({
  email,
  token,
  password,
  savePassword,
}) => {

  if (email != null) {
    localStorage.setItem(localStorageEmail, email);
  }
  if (token != null) {
    localStorage.setItem(localStorageToken, token);
  }
  if (savePassword != null)
    if (savePassword === true) {
      localStorage.setItem(localStoragePassword, password);
    } else {
      localStorage.removeItem(localStoragePassword);
    }
}

export const getFromLocalStorage = () => {
  const email = localStorage.getItem(localStorageEmail);

  const local = {};
  if (email != null) {
    local.email = email
    const password = localStorage.getItem(localStoragePassword);
    if (password != null) local.password = password;
    const token = localStorage.getItem(localStorageToken);
    if (token != null) local.token = token;
  }
  return local;
}

export const removeTokenFromLocalStorage = () => {
  localStorage.removeItem(localStorageToken);
}
