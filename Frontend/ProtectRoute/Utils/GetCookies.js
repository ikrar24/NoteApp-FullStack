function getCookie(name) {
 

  const value = `; ${document.cookie}`;

  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    const result = parts.pop().split(";").shift();

    return result;
  }
}

export { getCookie };
