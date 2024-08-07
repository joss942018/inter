"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  IValidacion,
  IValidar,
  useValidations,
} from "@/app/hooks/useValidations";
import _ from "lodash";

interface IOptions {
  minimo: number;
  maximo: number;
}

export interface IConfigValidacion {
  [key: string]: {
    validar: keyof IValidar;
    opcional: boolean;
    options?: IOptions;
  };
}

function useForm<
  T extends Object,
  U extends {
    [key in keyof T | string]: {
      validar: keyof IValidar;
      opcional: boolean;
      options?: IOptions;
    };
  },
  IFormValidado extends { [key in keyof T]: IValidacion },
>(
  initialFormData: T,
  tipoValidacion: U,
  onUpdateEnded?: (formData: T, formValidado?: boolean) => void,
) {
  const validations = useValidations();

  const inicializarValidacion = useCallback((tipoValidacionA: U) => {
    let tempValidacion = {} as IFormValidado;
    for (const key in tipoValidacionA) {
      if (Object.prototype.hasOwnProperty.call(tipoValidacionA, key)) {
        const el = tipoValidacionA[key];
        tempValidacion = {
          ...tempValidacion,
          [key]: { validado: el.opcional, mensaje: "" },
        };
      }
    }
    return tempValidacion;
  }, []);
  const [finishedUpdating, setFinishedUpdating] = useState(true);

  const [formData, setFormData] = useState(initialFormData);
  const [formValidacion, setFormValidacion] = useState<IFormValidado>(() =>
    inicializarValidacion(tipoValidacion),
  );
  const [formValidado, setFormValidado] = useState(false);
  const tipoValidacion1 = useRef(tipoValidacion);

  const handleValidacion = useCallback(
    (name: keyof U, value: string | number | boolean | Date | null) => {
      const validacion = validations[tipoValidacion1.current[name].validar](
        value === null || value === undefined ? "" : value.toString(),
        tipoValidacion1.current[name].opcional,
      );
      setFormValidacion((fV) => ({ ...fV, [name]: validacion }));
    },
    [validations],
  );

  const handleChange = useCallback(
    (name: keyof T, value: string | number | boolean | Date | null) => {
      if (value?.toString() === String(formData[name])) return;
      setFinishedUpdating(false);
      setFormData((fD) => ({
        ...fD,
        [name]: value,
      }));
      handleValidacion(name as keyof U, value);
    },
    [handleValidacion, formData],
  );

  useEffect(() => {
    if (!onUpdateEnded || _.isEqual(initialFormData, formData)) return;
    const timer = setTimeout(() => {
      setFinishedUpdating(true);
      if (onUpdateEnded) onUpdateEnded(formData, formValidado);
    }, 750);
    return () => clearTimeout(timer);
  }, [formData, onUpdateEnded, formValidado]);

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setFormValidacion(inicializarValidacion(tipoValidacion1.current));
  }, [inicializarValidacion, initialFormData]);

  useEffect(() => {
    let tempValidado = true;
    for (const key in formValidacion) {
      if (Object.prototype.hasOwnProperty.call(formValidacion, key)) {
        const el = formValidacion[key];
        if (el.validado === false) {
          tempValidado = false;
          break;
        }
      }
    }
    setFormValidado(tempValidado);
  }, [formValidacion]);

  const formatearData = useCallback(
    (data: T): T => {
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          const el = data[key];
          if (typeof initialFormData[key] === "number") {
            data = { ...data, [key]: el ?? 0 };
          } else {
            data = { ...data, [key]: el ?? "" };
          }
        }
      }
      return data;
    },
    [initialFormData],
  );

  const validarTodo = useCallback(
    (data: T) => {
      let tempFormValidacion: any = {};
      let key: keyof T & keyof U;
      for (key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          const el = data[key] as any;
          if (tipoValidacion1.current[key]) {
            tempFormValidacion[key] = {
              mensaje: "",
              validado: validations[tipoValidacion1.current[key].validar](
                el.toString(),
                tipoValidacion1.current[key].opcional,
              ).validado,
            };
          }
        }
      }
      setFormValidacion(tempFormValidacion);
    },
    [validations],
  );

  const setFormData1 = useCallback(
    (data: T) => {
      const data1 = formatearData(data);
      setFormData(data1);
      validarTodo(data1);
    },
    [formatearData, validarTodo],
  );

  const setOptional = useCallback(
    (data: { key: keyof T; opcional: boolean }[]) => {
      let object: IConfigValidacion = {};
      for (const el of data) {
        object[el.key as keyof IConfigValidacion] = {
          validar: tipoValidacion1.current[el.key as keyof U].validar,
          opcional: el.opcional,
        };
      }
      tipoValidacion1.current = { ...tipoValidacion1.current, ...object };
      validarTodo(formData);
    },
    [formData, validarTodo],
  );

  const showValidations = useCallback(() => {
    const data = { ...formData };
    let tempFormValidacion: any = {};
    let key: keyof T & keyof U;
    for (key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const el = data[key] as any;
        if (tipoValidacion1.current[key]) {
          const validationResult = validations[
            tipoValidacion1.current[key].validar
          ](el.toString(), tipoValidacion1.current[key].opcional);
          tempFormValidacion[key] = {
            mensaje: validationResult.mensaje,
            validado: validationResult.validado,
          };
        }
      }
    }
    setFormValidacion(tempFormValidacion);
  }, [formData, validations]);

  return {
    formData,
    handleChange,
    finishedUpdating,
    setFormData: setFormData1,
    formValidacion,
    formValidado,
    resetForm,
    setOptional,
    showValidations,
  };
}

export default useForm;
