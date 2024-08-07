import { useTranslations } from "next-intl";

export const objValidado = { validado: true, mensaje: "" };
export const objValidadoInicial = { validado: false, mensaje: "" };

interface T {
  [key: string]: { validado: boolean; mensaje: string };
}

interface U extends Object {
  [key: string]: any;
}

export const useValidations = () => {
  const t = useTranslations("FormValidations");

  const objInvalido = (mensaje: string): IValidacion => {
    return { validado: false, mensaje };
  };

  const validarForm = (formValidacion: T) => {
    let key: keyof T;
    for (key in formValidacion) {
      if (Object.prototype.hasOwnProperty.call(formValidacion, key)) {
        const el = formValidacion[key];
        if (!el.validado) {
          return false;
        }
      }
    }
    return true;
  };

  const validarCamposLlenos = (form: U) => {
    let tempValidacion: T = {};
    for (const key in form) {
      if (Object.prototype.hasOwnProperty.call(form, key)) {
        const el = form[key];
        tempValidacion = { ...tempValidacion, [key]: validarVacio(el) };
      }
    }
    return tempValidacion;
  };

  function validarVacio(texto: string): IValidacion {
    if (texto.length === 0) {
      return objInvalido(String(t("required")));
    } else {
      return objValidado;
    }
  }

  function general(texto: string, opcional: boolean = false): IValidacion {
    return opcional ? objValidado : validarVacio(texto);
  }

  function texto(texto: string, opcional: boolean = false): IValidacion {
    let val = validarVacio(texto);
    if (!val.validado) {
      return opcional ? objValidado : val;
    } else {
      var expression = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
      return expression.test(texto)
        ? objValidado
        : objInvalido(t("only_letters"));
    }
  }

  function numeros(texto: string, opcional: boolean = false): IValidacion {
    let val = validarVacio(texto);
    if (!val.validado) {
      return opcional ? objValidado : val;
    } else {
      var expression = /^[-+]?[0-9]{1,10000}([.]?[0-9]{1,10000})?$/;
      return expression.test(texto)
        ? objValidado
        : objInvalido(t("only_numbers"));
    }
  }

  function numerosPositivos(
    texto: string,
    opcional: boolean = false
  ): IValidacion {
    let val = validarVacio(texto);
    if (!val.validado) {
      return opcional ? objValidado : val;
    } else {
      var expression = /^[+]?[0-9]{1,10000}([.]?[0-9]{1,10000})?$/;
      return expression.test(texto)
        ? objValidado
        : objInvalido(t("only_positive_numbers"));
    }
  }

  function numerosNegativos(
    texto: string,
    opcional: boolean = false
  ): IValidacion {
    let val = validarVacio(texto);
    if (!val.validado) {
      return opcional ? objValidado : val;
    } else {
      var expression = /^[-+]?[0-9]{1,10000}([.]?[0-9]{1,10000})?$/;
      return expression.test(texto)
        ? objValidado
        : objInvalido(t("only_negative_numbers"));
    }
  }

  function cedula(texto: string, opcional: boolean = false): IValidacion {
    let val = validarVacio(texto);
    if (!val.validado) {
      return opcional ? objValidado : val;
    } else {
      var expression = /^[0-9]{10,13}?$/;
      return expression.test(texto)
        ? objValidado
        : objInvalido(t("invalid_id"));
    }
  }

  function direccion(texto: string, opcional: boolean = false): IValidacion {
    let val = validarVacio(texto);
    if (!val.validado) {
      return opcional ? objValidado : val;
    } else {
      var expression = /^.{1,100}$/;
      return expression.test(texto)
        ? objValidado
        : objInvalido(t("invalid_address"));
    }
  }

  function email(texto: string, opcional: boolean = false): IValidacion {
    let val = validarVacio(texto);
    if (!val.validado) {
      return opcional ? objValidado : val;
    } else {
      var expression = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
      return expression.test(texto)
        ? objValidado
        : objInvalido(t("invalid_email"));
    }
  }

  function telefono(texto: string, opcional: boolean = false): IValidacion {
    let val = validarVacio(texto);
    if (!val.validado) {
      return opcional ? objValidado : val;
    } else {
      var expression =
        /([0-9\s\-]{7,})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/im;
      ///^\+?([0-9\s\-]{7,})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/im;
      // /^\+?\d{1,3}[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/im;
      // var expression =
      //   /^[\+]?[(]?[0-9]{2,3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{1,6}$/im;
      return expression.test(texto)
        ? objValidado
        : objInvalido(t("invalid_phone"));
    }
  }

  function noCero(texto: string, opcional: boolean = false): IValidacion {
    let val = validarVacio(texto);
    if (!val.validado) {
      return opcional ? objValidado : val;
    } else {
      return parseInt(texto, 10) !== 0
        ? objValidado
        : objInvalido(t("select_an_option"));
    }
  }

  function placa(texto: string, opcional: boolean = false): IValidacion {
    let val = validarVacio(texto);
    if (!val.validado) {
      return opcional ? objValidado : val;
    } else {
      var expression = /^(?:[a-zA-Z][a-zA-Z-][a-zA-Z][0-9]{4})$/im;
      return expression.test(texto)
        ? objValidado
        : objInvalido(t("invalid_plate_number") + " (ABC-1234)");
    }
  }

  function ecuacion(texto: string, opcional: boolean = false): IValidacion {
    let val = validarVacio(texto);
    if (!val.validado) {
      return opcional ? objValidado : val;
    } else {
      var expression = /^[0-9^x*#+.-]+$/gm;
      return expression.test(texto)
        ? objValidado
        : objInvalido(t("invalid_equation"));
    }
  }

  function contrasena(texto: string, opcional: boolean = false): IValidacion {
    let val = validarVacio(texto);
    if (!val.validado) {
      return opcional ? objValidado : val;
    } else {
      // var expression = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/gm;
      var expression =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d._$&!¡¿?-]{8,}$/gm;
      return expression.test(texto)
        ? objValidado
        : objInvalido(t("invalid_password"));
    }
  }

  function fecha(texto: string, opcional: boolean = false): IValidacion {
    let val = validarVacio(texto);
    if (!val.validado) {
      return opcional ? objValidado : val;
    } else {
      // var expression = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/gm;
      const validation = new Date(texto);
      return validation instanceof Date &&
        !isNaN(validation.valueOf()) &&
        validation.getTime() > 0
        ? objValidado
        : objInvalido(t("invalid_date"));
    }
  }

  function website(texto: string, opcional: boolean = false): IValidacion {
    let val = validarVacio(texto);
    if (!val.validado) {
      return opcional ? objValidado : val;
    } else {
      var expression = /^[a-zA-Z0-9.]+$/g;
      return expression.test(texto)
        ? objValidado
        : objInvalido(t("invalid_website"));
    }
  }

  return {
    validarForm,
    validarCamposLlenos,
    general,
    texto,
    numeros,
    numerosPositivos,
    numerosNegativos,
    cedula,
    direccion,
    email,
    telefono,
    noCero,
    placa,
    ecuacion,
    contrasena,
    fecha,
    website,
  };
};

export interface IValidar {
  general: (texto: string, opcional?: boolean) => IValidacion;
  texto: (texto: string, opcional?: boolean) => IValidacion;
  numeros: (texto: string, opcional?: boolean) => IValidacion;
  numerosPositivos: (texto: string, opcional?: boolean) => IValidacion;
  numerosNegativos: (texto: string, opcional?: boolean) => IValidacion;
  cedula: (texto: string, opcional?: boolean) => IValidacion;
  direccion: (texto: string, opcional?: boolean) => IValidacion;
  email: (texto: string, opcional?: boolean) => IValidacion;
  telefono: (texto: string, opcional?: boolean) => IValidacion;
  noCero: (texto: string, opcional?: boolean) => IValidacion;
  placa: (texto: string, opcional?: boolean) => IValidacion;
  ecuacion: (texto: string, opcional?: boolean) => IValidacion;
  contrasena: (texto: string, opcional?: boolean) => IValidacion;
  fecha: (texto: string, opcional?: boolean) => IValidacion;
  website: (texto: string, opcional?: boolean) => IValidacion;
}

export interface IValidacion {
  validado: boolean;
  mensaje: string;
}

export default useValidations;
