"use client"

import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
//import { Label } from "@/components/ui/Label";
//import { Input } from "@/components/ui/input";
import { useValidationForData, useValidatorData } from '@/components/hooks/TocDataApi';
//import { QueryClient } from '@tanstack/react-query';
import { JsonForms } from '@jsonforms/react';
import { vanillaCells, vanillaRenderers, JsonFormsStyleContext } from '@jsonforms/vanilla-renderers';
import pack from '../../../package.json';
//import { UISchemaElement } from '@jsonforms/core/lib/models/uischema';
//import { JSONSchema7 } from "json-schema";

console.log(pack.version);
//https://codesandbox.io/p/sandbox/jsonforms-tailwind-forked-krq5nd?file=%2Fsrc%2FApp.tsx

interface ModelFormProps {
  modelId: string;
  setModelLink: Dispatch<SetStateAction<string>>;
  setModelParams: Dispatch<SetStateAction<string>>;
}

const styleContextValue = {
  styles: [
    {
      name: "control",
      classNames: ['my-5']
    },
    {
      name: "control.input",
      classNames:
        ['w-full', 'bg-gray-100', 'rounded', 'border', 'border-gray-300', 'focus:border-indigo-500', 'text-base', 'outline-none', 'text-gray-700', 'py-1', 'px-3', 'leading-8', 'transition-colors', 'duration-200', 'ease-in-out', 'font-sans']
    },
    {
      name: "control.select",
      classNames:
        ['w-full', 'bg-gray-100', 'rounded', 'border', 'border-gray-300', 'focus:border-indigo-500', 'text-base', 'outline-none', 'text-gray-700', 'py-1', 'px-3', 'leading-8', 'transition-colors', 'duration-200', 'ease-in-out', 'appearance-none']
    },
    {
      name: "control.label",
      classNames:
        ['block', 'uppercase', 'tracking-wide', 'text-gray-700', 'text-xs', 'font-bold', 'pb-4']
    },
    {
      name: "array.button",
      classNames: ['custom-array-button']
    },
    {
      name: "control.validation",
      classNames: ['text-red-500', 'font-normal', 'mt-2', 'text-xs']
    },
    {
      name: "vertical.layout",
      classNames:
        ['block', 'uppercase', 'tracking-wide', 'text-gray-700', 'text-xs', 'font-bold', 'mb-2']
    },
    {
      name: "group.layout",
      classNames: ['accordion-item', 'bg-white']
    },
    {
      name: "group.label",
      classNames:
        ['accordion-button', 'relative', 'flex', 'w-full', 'py-4', 'transition', 'focus:outline-none', 'block', 'uppercase', 'tracking-wide', 'text-gray-700', 'text-xs', 'font-bold', 'pb-4']
    }
  ]
};

const selectData = (data: any, modelPath: string) => {
  //  console.log("selectData works")
  const dataFromLocal = localStorage.getItem(modelPath);
  if (dataFromLocal != undefined) {
    localStorage.removeItem(modelPath);
    // setTriggerLinkRender(true);
    return JSON.parse(dataFromLocal);
  }
  return data;
}

const ModelForm: React.FC<ModelFormProps> = ({ modelId, setModelLink, setModelParams }) => {
  const [form, setForm] = useState({});
  const [formUI, setFormUI] = useState([]);
  const [formValues, setFormValues] = useState({});
  const { data, error, isLoading } = useValidatorData(modelId);
  const validation = useValidationForData(modelId, formValues);

  useEffect(() => {
    if (data) {
      setFormValues(selectData(data.formsData, "/models/" + modelId));
      setForm(data.schema);
      setFormUI(data.uischema);
    }
  }, [data, modelId]);


  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  const onChange = ({ errors, data }: { errors: any[], data: any }) => {
    //console.log("onChange works", errors, data);
    if (errors.length == 0) {
      //validation.mutate({ modelId: modelId, paramsData: data });
      // console.log("result::", validation.data);
    }

    // if (isFormDataDifferent(formValues, data)) {
    //   if (errors.length == 0) {
    //     const requestOptions = {
    //       method: 'POST',
    //       headers: { 'Content-Type': 'application/json' },
    //       body: JSON.stringify(data)
    //     };
    //     fetch(config.app.CAD_SERVICE_URL + '/models/' + props.modelId + '/validator', requestOptions)
    //       .then(response => response.json())
    //       .then(newdata => {
    //         //do not update if status code != 200
    //         setFormValues({ ...newdata })
    //       })
    //   }
    // }
  }
  //<form className="space-y-4">
  return (
    <>
      <JsonFormsStyleContext.Provider value={styleContextValue}>
        <JsonForms
          schema={form}
          uischema={formUI as any}
          data={formValues}
          validationMode="ValidateAndShow"
          renderers={vanillaRenderers}
          onChange={onChange}
          cells={vanillaCells}
        />
      </JsonFormsStyleContext.Provider>
    </>
  );
};
//   </form>
export default ModelForm;
