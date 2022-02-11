// import { useEffect, useState, useRef } from "react";
// import { useSelector, shallowEqual, useDispatch } from "react-redux";
// import {
//   movieActions,
//   crewmemberActions,
// } from "../actions";

// import { DataTable } from "primereact/datatable";
// import { Column } from "primereact/column";
// import { Button } from "primereact/button";
// import { InputText } from "primereact/inputtext";
// import { Dialog } from "primereact/dialog";
// import { Calendar } from "primereact/calendar";

// const movieListSelector = (state) => state.movie.movieList;
// const crewmemberListSelector = (state) => state.crewmember.crewmemberList;

// function MovieEditor() {
//   //movie
//   const [isDialogShown, setIsDialogShown] = useState(false);
//   const [isNewMovie, setIsNewMovie] = useState(true);
//   const [selected, setSelected] = useState(null);
//   const [title, setTitle] = useState("");
//   const [category, setCategory] = useState("");
//   const [publicationDate, setPublicationDate] = useState(new Date());
//   const dt = useRef(null);
//   const movieList = useSelector(movieListSelector, shallowEqual);

//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(movieActions.getMovies());
//   }, [dispatch]);

//   const addNew = () => {
//     setIsDialogShown(true);
//     setTitle("");
//     setCategory("");
//     setPublicationDate(new Date());
//     setSelected(null);
//     setIsNewMovie(true);
//   };

//   const saveMovie = () => {
//     if (isNewMovie) {
//       dispatch(movieActions.addMovie({ title, category, publicationDate }));
//     } else {
//       dispatch(
//         movieActions.updateMovie(selected, { title, category, publicationDate })
//       );
//     }

//     setIsDialogShown(false);
//     setTitle("");
//     setCategory("");
//     setPublicationDate(new Date());
//     setSelected(null);
//   };

//   const deleteMovie = (rowData) => {
//     dispatch(movieActions.deleteMovie(rowData.id));
//   };

//   const editMovie = (rowData) => {
//     setSelected(rowData.id);
//     setTitle(rowData.title);
//     setCategory(rowData.category);
//     setPublicationDate(rowData.publicationDate);
//     setIsDialogShown(true);
//     setIsNewMovie(false);
//   };

//   const hideDialog = () => {
//     setIsDialogShown(false);
//   };

//   const exportCSV = (selectionOnly) => {
//     dt.current.exportCSV({ selectionOnly });
//   };

//   const tableHeader = (
//     <div>
//       <Button
//         type="button"
//         icon="pi pi-file"
//         onClick={() => exportCSV(false)}
//         className="mr-2"
//         data-pr-tooltip="CSV"
//       />
//     </div>
//   );

//   const tableFooter = (
//     <div>
//       <Button label="Add" icon="pi pi-plus" onClick={addNew} />
//     </div>
//   );

//   const addDialogFooter = (
//     <div>
//       <Button label="Save" icon="pi pi-save" onClick={saveMovie} />
//     </div>
//   );

//   const opsColumn = (rowData) => {
//     return (
//       <>
//         <Button
//           icon="pi pi-times"
//           className="p-button-danger"
//           onClick={() => deleteMovie(rowData)}
//         />
//         <br></br>
//         <Button
//           icon="pi pi-pencil"
//           className="p-button-warning"
//           onClick={() => editMovie(rowData)}
//         />
//         <br></br>
//         <Button
//           icon="pi
//                     pi-align-justify"
//           className="p-button-info"
//           onClick={() => crewmemberMovie(rowData)} // !?
//         />
//       </>
//     );
//   };
//   //movie

//   //crewmember
//   const [name, setName] = useState("");
//   const [role, setRole] = useState("");
//   const [isNewCrewmember, setIsNewCrewmember] = useState(true);
//   const [selectedCrewmember, setSelectedCrewmember] = useState(null);
//   const [isCrewmemberDialogShown, setIsCrewmemberDialogShown] = useState(false);
//   const [isCrewmemberShown, setIsCrewmemberShown] = useState(false);
//   const [movieId, setMovieId] = useState(null);

//   const crewmemberList = useSelector(crewmemberListSelector, shallowEqual);

//   const addNewCrewmember = () => {
//     setIsCrewmemberDialogShown(true);
//     setName("");
//     setRole("");
//     setSelectedCrewmember(null);
//     setIsNewCrewmember(true);
//   };

//   const hideCrewmemberDialog = () => {
//     setIsCrewmemberDialogShown(false);
//     setIsNewCrewmember(false);
//   };

//   const saveCrewmember = () => {
//     if (isNewCrewmember) {
//       dispatch(
//         crewmemberActions.addCrewmember(movieId, {
//           name,
//           role
//         })
//       );
//     } else {
//       dispatch(
//         crewmemberActions.updateCrewmember(movieId, selectedCrewmember, {
//           name,
//           role
//         })
//       );
//     }
//     setName("");
//     setRole("");
//     setSelectedCrewmember(null);
//     setIsCrewmemberDialogShown(false);
//   };

//   const addCrewmemberDialogFooter = (
//     <div>
//       <Button label="Save" icon="pi pi-save" onClick={saveCrewmember} />
//     </div>
//   );

//   const crewmemberTableFooter = (
//     <div>
//       <Button label="Add" icon="pi pi-plus" onClick={addNewCrewmember} />
//     </div>
//   );

//   const opsCrewmemberColumn = (rowData) => {
//     return (
//       <>
//         <Button
//           icon="pi pi-times"
//           className="p-button-danger"
//           onClick={() => deleteCrewmember(rowData)}
//         />
//         <Button
//           icon="pi pi-pencil"
//           className="p-button-warning"
//           onClick={() => updateCrewmember(rowData)}
//         />
//       </>
//     );
//   };

//   const deleteCrewmember = (rowData) => {
//     dispatch(crewmemberActions.deleteCrewmember(movieId, rowData.id));
//   };

//   const updateCrewmember = (rowData) => {
//     setSelectedCrewmember(rowData.id);
//     setName(rowData.name);
//     setRole(rowData.role);
//     setIsNewCrewmember(false);
//     setIsCrewmemberDialogShown(true);
//   };

//   const crewmemberMovie = (rowData) => {
//     setIsCrewmemberShown(true);
//     dispatch(crewmemberActions.getCrewmembers(rowData.id));
//     setMovieId(rowData.id);
//   };

//   //crewmember

//   // let list;
//   // movieList.forEach(element => {
//   //   list.push(element);
//   // });

//   return (
//     <div>
//       <DataTable
//         ref={dt}
//         value={movieList}
//         footer={tableFooter}
//         header={tableHeader}
//         selectionMode="multiple"
//       >
//         <Column header="Title" field="title" sortable />
//         <Column header="Category" field="category" sortable />
//         <Column header="Publication Date" field="publicationDate" sortable />

//         <Column body={opsColumn} />
//       </DataTable>

//       {isDialogShown ? (
//         <Dialog
//           visible={isDialogShown}
//           onHide={hideDialog}
//           footer={addDialogFooter}
//           header="Add movie"
//         >
//           <InputText
//             onChange={(evt) => setTitle(evt.target.value)}
//             value={title}
//             name="title"
//             placeholder="title"
//           />
//           <InputText
//             onChange={(evt) => setCategory(evt.target.value)}
//             value={category}
//             name="category"
//             placeholder="category"
//           />
//           <Calendar
//             onChange={(evt) => setPublicationDate(evt.target.value)}
//             value={publicationDate}
//             name="publicationDdate"
//             placeholder="publication-date"
//           />
//         </Dialog>
//       ) : null}

//       {isCrewmemberShown ? (
//         <Dialog
//           visible={isCrewmemberShown}
//           onHide={hideCrewmemberDialog}
//           header="Crewmembers"
//         >
//           <DataTable value={crewmemberList} footer={crewmemberTableFooter}>
//             <Column header="Name" field="name" sortable />
//             <Column header="Role" field="role" sortable />
//             <Column body={opsCrewmemberColumn} />
//           </DataTable>
//         </Dialog>
//       ) : null}

//       {isCrewmemberDialogShown ? (
//         <Dialog
//           visible={isCrewmemberDialogShown}
//           onHide={hideCrewmemberDialog}
//           footer={addCrewmemberDialogFooter}
//           header="Crewmember"
//         >
//           <InputText
//             onChange={(evt) => setName(evt.target.value)}
//             value={name}
//             name="name"
//             placeholder="name"
//           />

//           <InputText
//             onChange={(evt) => setRole(evt.target.value)}
//             value={role}
//             name="role"
//             placeholder="role"
//           />

//         </Dialog>
//       ) : null}
//     </div>
//   );
// }

// export default MovieEditor;

import { useEffect, useState, useRef } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { movieActions, crewmemberActions } from "../actions";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { Calendar } from "primereact/calendar";

const movieListSelector = (state) => state.movie.movieList;
const crewmemberListSelector = (state) => state.crewmember.crewmemberList;

function MovieEditor() {
  //movie
  const [isDialogShown, setIsDialogShown] = useState(false);
  const [isNewMovie, setIsNewMovie] = useState(true);
  const [selected, setSelected] = useState(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [publicationDate, setPublicationDate] = useState(new Date());
  const dt = useRef(null);
  const movieList = useSelector(movieListSelector, shallowEqual);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(movieActions.getMovies());
  }, [dispatch]);

  const addNew = () => {
    setIsDialogShown(true);
    setTitle("");
    setCategory("");
    setPublicationDate(new Date());
    setSelected(null);
    setIsNewMovie(true);
  };

  const saveMovie = () => {
    if (isNewMovie) {
      dispatch(movieActions.addMovie({ title, category, publicationDate }));
    } else {
      dispatch(
        movieActions.updateMovie(selected, { title, category, publicationDate })
      );
    }

    setIsDialogShown(false);
    setTitle("");
    setCategory("");
    setPublicationDate(new Date());
    setSelected(null);
  };

  const deleteMovie = (rowData) => {
    dispatch(movieActions.deleteMovie(rowData.id));
  };

  const editMovie = (rowData) => {
    setSelected(rowData.id);
    setTitle(rowData.title);
    setCategory(rowData.category);
    setPublicationDate(rowData.publicationDate);
    setIsDialogShown(true);
    setIsNewMovie(false);
  };

  const hideDialog = () => {
    setIsDialogShown(false);
  };

  const exportCSV = (selectionOnly) => {
    dt.current.exportCSV({ selectionOnly });
  };

  const tableHeader = (
    <div>
      <Button
        type="button"
        icon="pi pi-file"
        onClick={() => exportCSV(false)}
        className="mr-2"
        data-pr-tooltip="CSV"
      />
    </div>
  );

  const tableFooter = (
    <div>
      <Button label="Add" icon="pi pi-plus" onClick={addNew} />
    </div>
  );

  const addDialogFooter = (
    <div>
      <Button label="Save" icon="pi pi-save" onClick={saveMovie} />
    </div>
  );

  const opsColumn = (rowData) => {
    return (
      <>
        <Button
          icon="pi pi-times"
          className="p-button-danger"
          onClick={() => deleteMovie(rowData)}
        />
        <br></br>
        <Button
          icon="pi pi-pencil"
          className="p-button-warning"
          onClick={() => editMovie(rowData)}
        />
        <br></br>
        <Button
          icon="pi 
                    pi-align-justify"
          className="p-button-info"
          onClick={() => crewmemberMovie(rowData)}
        />
      </>
    );
  };
  //movie

  //crewmember
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [isNewCrewmember, setIsNewCrewmember] = useState(true);
  const [selectedCrewmember, setSelectedCrewmember] = useState(null);
  const [isCrewmemberDialogShown, setIsCrewmemberDialogShown] = useState(false);
  const [isCrewmemberShown, setIsCrewmemberShown] = useState(false);
  const [movieId, setMovieId] = useState(null);

  const crewmemberList = useSelector(crewmemberListSelector, shallowEqual);

  const addNewCrewmember = () => {
    setIsCrewmemberDialogShown(true);
    setName("");
    setRole("");
    setSelectedCrewmember(null);
    setIsNewCrewmember(true);
  };

  const hideCrewmemberDialog = () => {
    setIsCrewmemberDialogShown(false);
    setIsCrewmemberShown(false);
  };

  const saveCrewmember = () => {
    if (isNewCrewmember) {
      dispatch(
        crewmemberActions.addCrewmember(movieId, {
          name,
          role,
        })
      );
    } else {
      dispatch(
        crewmemberActions.updateCrewmember(movieId, selectedCrewmember, {
          name,
          role,
        })
      );
    }
    setName("");
    setRole("");
    setSelectedCrewmember(null);
    setIsCrewmemberDialogShown(false);
  };

  const addCrewmemberDialogFooter = (
    <div>
      <Button label="Save" icon="pi pi-save" onClick={saveCrewmember} />
    </div>
  );

  const crewmemberTableFooter = (
    <div>
      <Button label="Add" icon="pi pi-plus" onClick={addNewCrewmember} />
    </div>
  );

  const opsCrewmemberColumn = (rowData) => {
    return (
      <>
        <Button
          icon="pi pi-times"
          className="p-button-danger"
          onClick={() => deleteCrewmember(rowData)}
        />
        <Button
          icon="pi pi-pencil"
          className="p-button-warning"
          onClick={() => updateCrewmember(rowData)}
        />
      </>
    );
  };
  const deleteCrewmember = (rowData) => {
    dispatch(crewmemberActions.deleteCrewmember(movieId, rowData.id));
  };

  const updateCrewmember = (rowData) => {
    setSelectedCrewmember(rowData.id);
    setName(rowData.name);
    setRole(rowData.role);
    setIsNewCrewmember(false);
    setIsCrewmemberDialogShown(true);
  };

  const crewmemberMovie = (rowData) => {
    setIsCrewmemberShown(true);
    dispatch(crewmemberActions.getCrewmembers(rowData.id));
    setMovieId(rowData.id);
  };

  //crewmember

  return (
    <div>
      <DataTable
        ref={dt}
        value={movieList}
        footer={tableFooter}
        header={tableHeader}
        selectionMode="multiple"
      >
        <Column header="Title" field="title" sortable />
        <Column header="Category" field="category" sortable />
        <Column header="Publication Date" field="publicationDate" sortable />
        <Column body={opsColumn} />
      </DataTable>
      {isDialogShown ? (
        <Dialog
          visible={isDialogShown}
          onHide={hideDialog}
          footer={addDialogFooter}
          header="A movie"
        >
          <InputText
            onChange={(evt) => setTitle(evt.target.value)}
            value={title}
            name="title"
            placeholder="title"
          />
          <InputText
            onChange={(evt) => setCategory(evt.target.value)}
            value={category}
            name="category"
            placeholder="category"
          />
          <Calendar
            onChange={(evt) => setPublicationDate(evt.target.value)}
            value={publicationDate}
            name="publicationDate"
            placeholder="publicationDate"
          />
        </Dialog>
      ) : null}

      {isCrewmemberShown ? (
        <Dialog
          visible={isCrewmemberShown}
          onHide={hideCrewmemberDialog}
          header="crewmembers"
        >
          <DataTable value={crewmemberList} footer={crewmemberTableFooter}>
            <Column header="Name" field="name" sortable />
            <Column header="Role" field="role" sortable />
            <Column body={opsCrewmemberColumn} />
          </DataTable>
        </Dialog>
      ) : null}

      {isCrewmemberDialogShown ? (
        <Dialog
          visible={isCrewmemberDialogShown}
          onHide={hideCrewmemberDialog}
          footer={addCrewmemberDialogFooter}
          header="crewmember"
        >
          <InputText
            onChange={(evt) => setName(evt.target.value)}
            value={name}
            name="name"
            placeholder="name"
          />

          <InputText
            onChange={(evt) => setRole(evt.target.value)}
            value={role}
            name="role"
            placeholder="role"
          />

        </Dialog>
      ) : null}
    </div>
  );
}

export default MovieEditor;
