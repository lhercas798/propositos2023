import React from "react";
import { Formik, Field, Form,  FieldArray ,ErrorMessage} from "formik";
import * as Yup from "yup";
const initialValues = {
  tareas: [
    {
      tarea: "",
      complete: "",
    },
  ],
};
const tareasSchema = Yup.object({
  tareas: Yup.array().of(
    Yup.object().shape({
      tarea: Yup.string().min(4, 'proposito must be at least 4 characters').max(25, 'proposito must be at most 25 characters').required("propósito required"),
      complete: Yup.string().required("complete required"),
    })
  ),
});

export const TaskList = () => (
  <div>
    <h1>Propositos 2023</h1>
    <Formik
      initialValues={initialValues}
      validationSchema={tareasSchema}
      onSubmit={async (values) => {
        await new Promise((r) => setTimeout(r, 500));
       alert(JSON.stringify(values, null, 2)) ;
      }}
    >
      {({ values }) => (
        <Form>
          <FieldArray name="tareas">
            {({ insert, remove, push }) => (
              <div>
                {values.tareas.length > 0 &&
                  values.tareas.map((tarea, index) => (
                    <div key={index} className="card-item">
                      <div>
                        <label htmlFor={`tareas.${index}.tarea`}>Proposito</label>
                        <Field
                          name={`tareas.${index}.tarea`}
                          placeholder="To do"
                          type="text"
                        />
                        {
                          <ErrorMessage
                            name={`tareas.${index}.tarea`}
                            component="div"
                          />
                        }
                      </div>
                      <div>
                        <label htmlFor={`fecha.${index}.fecha`}>fecha de inicio</label>
                        <Field
                          name={`fecha.${index}.fecha`}
                          placeholder="date"
                          type="date"
                        />
                        {
                          <ErrorMessage
                            name={`tareas.${index}.tarea`}
                            component="div"
                          />
                        }
                      </div>
                      <div>
                        <label htmlFor={`tareas.${index}.complete`}>
                          Complete
                        </label>
                        <Field
                          name={`tareas.${index}.complete`}
                          placeholder="complete"
                          type="text"
                        />
                        <ErrorMessage
                          name={`tareas.${index}.complete`}
                          component="div"
                        />
                      </div>
                      <div>
                        <button type="button" onClick={() => remove(index)}>
                          X
                        </button>
                      </div>
                    </div>
                  ))}
                <button
                  type="button"
                  className="secondary"
                  onClick={() => push({ tarea: "", complete: "" })}
                >
                  Añadir Proposito
                </button>
              </div>
            )}
          </FieldArray>
          <button type="submit">Enviar</button>
        </Form>
      )}
    </Formik>
  </div>
);
