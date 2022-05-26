import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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

import { fetchAllUsers, deleteUser } from "actions/UserAction";

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
    "fname",
    "lname",
    "email",
    "mnumber",
    "street",
    "city",
    "province",
  ]);

  // get state all user profiles
  const allUserProfiles = useSelector((state) => state.user.users);

  useEffect(() => {
    dispatch(fetchAllUsers());
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
      setCurrentList(allUserProfiles);
      setSearchText("");
    } else {
      setSearchTrue(true);
      setOldSearchText(searchText);
      setCurrentList(searchFunction(allUserProfiles));
    }
  };

  // handle search click
  const handleSortClick = (e, sortParam) => {
    e.preventDefault();
    if (sortTrue[sortParam]) {
      setCurrentList(sortFunction(allUserProfiles, sortParam, "dsc"));
      setSearchText("");
    } else {
      setCurrentList(sortFunction(allUserProfiles, sortParam, "asc"));
    }
  };

  useEffect(() => {
    // Get current Items
    if (allUserProfiles && allUserProfiles.length > 0 && currentList <= 0)
      setCurrentList(sortFunction(allUserProfiles, "fname", "asc"));
  }, [allUserProfiles, currentList]);

  const handleAddRowClick = (e) => {
    e.preventDefault();
    history("/pages/user/form");
  };

  const handleEditRowClick = (e, recId) => {
    e.preventDefault();
    history("/pages/user/form", { state: { userId: recId } });
  };

  const handleDeleteRowClick = (e, rec) => {
    e.preventDefault();
    dispatch(deleteUser(rec, history));
    setCurrentList([]);
    dispatch(fetchAllUsers());
    // window.location.reload();
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
            User Profiles
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
                      handleSortClick(e, "fname");
                    }}
                  >
                    Name{"  "}
                    {sortTrue.fname ? (
                      <i className="fas fa-sort-up" />
                    ) : (
                      <i className="fas fa-sort-down" />
                    )}
                  </th>
                  <th
                    scope="col"
                    onClick={(e) => {
                      handleSortClick(e, "email");
                    }}
                  >
                    Email{"  "}
                    {sortTrue.email ? (
                      <i className="fas fa-sort-up" />
                    ) : (
                      <i className="fas fa-sort-down" />
                    )}
                  </th>
                  <th scope="col">Contact No</th>
                  <th
                    scope="col"
                    onClick={(e) => {
                      handleSortClick(e, "city");
                    }}
                  >
                    Address{"  "}
                    {sortTrue.city ? (
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
                  ).map((user) => (
                    <tr key={user._id}>
                      <th scope="row">
                        <MKBox>
                          <Avatar
                            alt={user.fname}
                            src={`http://localhost:8070/${user.pic}`}
                            style={{ float: "left" }}
                          >
                            {user.fname && user.fname !== ""
                              ? user.fname.charAt(0).toUpperCase()
                              : null}
                          </Avatar>{" "}
                          <MKBox color="white" ml={5} px={2}>{`${user.fname} ${user.lname}`}</MKBox>
                        </MKBox>
                      </th>
                      <td>{user.email}</td>
                      <td>{user.mnumber}</td>
                      <td>{`${user.hno}, ${user.street}, ${user.city}, ${user.province}`}</td>
                      <td>
                        <MKBox mt={1} mb={1} sx={{ float: "right", minWidth: "9rem" }}>
                          <MKButton
                            id="edituser"
                            variant="gradient"
                            color="warning"
                            sx={{ margin: "0px 0.1rem", float: "left" }}
                            onClick={(e) => {
                              handleEditRowClick(e, user._id);
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
                              handleDeleteRowClick(e, user);
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
