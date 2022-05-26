import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import {
  Paper,
  TableContainer,
  Table,
  Avatar,
  Grid,
  Container,
  IconButton,
  InputAdornment,
  TablePagination,
} from "@mui/material";

import MKBox from "components/MKBox";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";

import { fetchAllVets, deleteVet } from "actions/VetAction";

function Record() {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [currentList, setCurrentList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchTrue, setSearchTrue] = useState(false);
  const [oldSearchText, setOldSearchText] = useState("");
  const [sortTrue, setSortTrue] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchParam] = useState([
    "_Id",
    "First_Name",
    "Last_Name",
    "username",
    "Gender",
    "City",
    "Country",
    "Contact_No",
    "Available_Day",
    "UserType",
    "Available_STime",
    "Available_ETime",
  ]);

  // get state all vet profiles
  const allVetProfiles = useSelector((state) => state.vet.vets);

  useEffect(() => {
    dispatch(fetchAllVets());
  }, []);

  const searchFunction = (items) =>
    items.filter((item) =>
      searchParam.some(
        (newItem) => item[newItem]?.toString().toLowerCase().indexOf(searchText.toLowerCase()) > -1
      )
    );

  const sortFunction = (items, sortParam, order) => {
    let out;
    if (order === "asc") {
      setSortTrue({ [sortParam]: true });
      out = items.sort((a, b) => (a[sortParam] > b[sortParam] ? 1 : -1));
    } else if (order === "dsc") {
      setSortTrue({ [sortParam]: false });
      out = items.sort((a, b) => (a[sortParam] < b[sortParam] ? 1 : -1));
    }
    return out;
  };
  // handle search click
  const handleSearchClick = (e) => {
    e.preventDefault();
    if (searchTrue && searchText === oldSearchText) {
      setSearchTrue(false);
      setCurrentList(allVetProfiles);
      setSearchText("");
    } else {
      setSearchTrue(true);
      setOldSearchText(searchText);
      setCurrentList(searchFunction(allVetProfiles));
    }
  };

  // handle search click
  const handleSortClick = (e, sortParam) => {
    e.preventDefault();
    if (sortTrue[sortParam]) {
      setCurrentList(sortFunction(allVetProfiles, sortParam, "dsc"));
      setSearchText("");
    } else {
      setCurrentList(sortFunction(allVetProfiles, sortParam, "asc"));
    }
  };

  useEffect(() => {
    // Get current Items
    if (allVetProfiles && allVetProfiles.length > 0 && currentList <= 0)
      setCurrentList(sortFunction(allVetProfiles, "First_Name", "asc"));
  }, [allVetProfiles, currentList]);

  const handleAddRowClick = (e) => {
    e.preventDefault();
    history("/pages/vet/form");
  };

  const handleEditRowClick = (e, recId) => {
    e.preventDefault();
    history("/pages/vet/form", { state: { vetId: recId } });
  };

  const handleDeleteRowClick = (e, rec) => {
    e.preventDefault();
    dispatch(deleteVet(rec, history));
    setCurrentList([]);
    dispatch(fetchAllVets());
    window.location.reload();
  };

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <MKBox component="section" py={2}>
      <Container container item xs={12} lg={6}>
        <Grid container item xs={12} lg={12}>
          <MKTypography variant="h3" mb={6}>
            Veterinary Profiles
          </MKTypography>
          <MKBox component="form" role="form">
            <MKInput
              sx={{ marginLeft: "1rem" }}
              label="Search"
              placeholder="Search"
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearchClick(e)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={(e) => {
                        handleSearchClick(e);
                      }}
                    >
                      {searchTrue && searchText === oldSearchText ? (
                        <i className="fa-solid fa-xmark" />
                      ) : (
                        <i className="fa-solid fa-magnifying-glass" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </MKBox>
          <MKBox sx={{ float: "right", margin: "0 0 0 auto" }}>
            <MKButton
              id="deleteuser"
              variant="gradient"
              color="info"
              sx={{ margin: "0px 10px", float: "right" }}
              onClick={(e) => {
                handleAddRowClick(e);
              }}
            >
              <i className="far fa-plus" />
            </MKButton>
          </MKBox>
        </Grid>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <thead>
                <tr>
                  <th
                    scope="col"
                    onClick={(e) => {
                      handleSortClick(e, "First_Name");
                    }}
                  >
                    Name{"  "}
                    {sortTrue.First_Name ? (
                      <i className="fas fa-sort-up" />
                    ) : (
                      <i className="fas fa-sort-down" />
                    )}
                  </th>
                  <th
                    scope="col"
                    onClick={(e) => {
                      handleSortClick(e, "Birthday");
                    }}
                  >
                    Birthday{"  "}
                    {sortTrue.Birthday ? (
                      <i className="fas fa-sort-up" />
                    ) : (
                      <i className="fas fa-sort-down" />
                    )}
                  </th>
                  <th
                    scope="col"
                    onClick={(e) => {
                      handleSortClick(e, "Gender");
                    }}
                  >
                    Gender{"  "}
                    {sortTrue.Gender ? (
                      <i className="fas fa-sort-up" />
                    ) : (
                      <i className="fas fa-sort-down" />
                    )}
                  </th>
                  <th
                    scope="col"
                    onClick={(e) => {
                      handleSortClick(e, "City");
                    }}
                  >
                    Address{"  "}
                    {sortTrue.City ? (
                      <i className="fas fa-sort-up" />
                    ) : (
                      <i className="fas fa-sort-down" />
                    )}
                  </th>
                  <th
                    scope="col"
                    onClick={(e) => {
                      handleSortClick(e, "username");
                    }}
                  >
                    Email{"  "}
                    {sortTrue.username ? (
                      <i className="fas fa-sort-up" />
                    ) : (
                      <i className="fas fa-sort-down" />
                    )}
                  </th>
                  <th scope="col">Contact_No</th>
                  <th
                    scope="col"
                    onClick={(e) => {
                      handleSortClick(e, "Available_Day");
                    }}
                  >
                    Available Day{"  "}
                    {sortTrue.Available_Day ? (
                      <i className="fas fa-sort-up" />
                    ) : (
                      <i className="fas fa-sort-down" />
                    )}
                  </th>
                  <th
                    scope="col"
                    onClick={(e) => {
                      handleSortClick(e, "UserType");
                    }}
                  >
                    User Type{"  "}
                    {sortTrue.UserType ? (
                      <i className="fas fa-sort-up" />
                    ) : (
                      <i className="fas fa-sort-down" />
                    )}
                  </th>
                  <th scope="col"> </th>
                </tr>
              </thead>
              <tbody>
                {currentList &&
                  Object.values(
                    currentList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  ).map((vet) => (
                    <tr key={vet._id}>
                      <th scope="row">
                        <MKBox>
                          <Avatar
                            alt={vet.First_Name}
                            src={`http://localhost:8070/${vet.profileImage}`}
                            style={{ float: "left" }}
                          >
                            {vet.First_Name && vet.First_Name !== ""
                              ? vet.First_Name.charAt(0).toUpperCase()
                              : null}
                          </Avatar>{" "}
                          <MKBox
                            color="white"
                            ml={5}
                            px={2}
                          >{`${vet.First_Name} ${vet.Last_Name}`}</MKBox>
                        </MKBox>
                      </th>
                      <td>{vet.Birthday && moment(vet.Birthday).format("YYYY-MM-DD")}</td>
                      <td>{vet.Gender}</td>
                      <td>{`${vet.City}, ${vet.Country}`}</td>
                      <td>{vet.username}</td>
                      <td>{vet.Contact_No}</td>
                      <td>{vet.Available_Day}</td>
                      <td>{vet.UserType}</td>
                      <td>
                        <MKBox mt={1} mb={1} sx={{ float: "right", minWidth: "9rem" }}>
                          <MKButton
                            id="edituser"
                            variant="gradient"
                            color="warning"
                            sx={{ margin: "0px 0.1rem", float: "left" }}
                            onClick={(e) => {
                              handleEditRowClick(e, vet._id);
                            }}
                          >
                            <i className="far fa-edit" />
                          </MKButton>
                          <MKButton
                            id="deleteuser"
                            variant="gradient"
                            color="error"
                            sx={{ margin: "0px 0.1rem", float: "right" }}
                            onClick={(e) => {
                              handleDeleteRowClick(e, vet);
                            }}
                          >
                            <i className="far fa-trash-alt" />
                          </MKButton>
                        </MKBox>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={currentList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Container>
    </MKBox>
  );
}

export default Record;
