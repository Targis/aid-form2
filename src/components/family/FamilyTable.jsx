import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Paper from '@mui/material/Paper';
import StarsIcon from '@mui/icons-material/Stars';
import Edit from '@mui/icons-material/Edit'
// import Preview from '@mui/icons-material/Preview'
import WysiwygIcon from '@mui/icons-material/Wysiwyg';
// import VisibilityIcon from '@mui/icons-material/Visibility';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import PersonDetails from 'components/PersonDetails'
import FamilyForm from 'components/family/FamilyForm'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const FamilyTable = ({ personsArray, changePerson, deletePerson }) => {

  const MySwal = withReactContent(Swal)

  const openPersonDetails = (person) => {
    MySwal.fire({
      title: 'Картка особи',
      html: <PersonDetails values={person} />,
      showCloseButton: true,
      confirmButtonText: 'Закрити',
    })
  }

  const handleChangePerson = (person) => {
    MySwal.fire({
      html: <FamilyForm personValues={person} isHouseholder={person.is_householder} submitAction={changePerson} closeAction={MySwal.close} clearable={false} />,
      width: '650px',
      showConfirmButton: false,
      showCloseButton: true,
    })
  }

  const handleDeletePerson = (person) => {
    MySwal.fire({
      title: 'Ви впевнені?',
      text: 'Дані про особу будуть видалені остаточно.',
      icon: 'warning',
      confirmButtonText: 'Так',
      cancelButtonText: 'Ні',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        deletePerson(person)
        Swal.fire({
          icon: 'success',
          title: 'Особу видалено',
          toast: true,
          position: 'bottom-start',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        })
      }
    })
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ pr: 0 }}></TableCell>
            <TableCell align="left">П.І.Б.</TableCell>
            <TableCell align="center">Дата народження</TableCell>
            <TableCell align="center">Ред.</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {personsArray.map((person, i) => (
            <TableRow
              key={person.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell sx={{ pr: 0 }} align="center">{i + 1}
              </TableCell>
              <TableCell component="th" scope="row">
                {person.last_name} {person.first_name} {person.middle_name}
              </TableCell>
              <TableCell align="center">{person.born}</TableCell>
              <TableCell align="center">
                {/* <IconButton><VisibilityIcon /></IconButton> */}
                <Tooltip title="Переглянути">
                  <IconButton onClick={() => openPersonDetails(person)}><WysiwygIcon /></IconButton>
                </Tooltip>

                <Tooltip title="Редагувати">
                  <IconButton onClick={() => handleChangePerson(person)}><Edit /></IconButton>
                </Tooltip>


                {!person.is_householder || personsArray.length === 1
                  ? (
                    <Tooltip title="Видалити">
                      <IconButton onClick={() => handleDeletePerson(person)}>
                        <DeleteForeverIcon color="error" />
                      </IconButton>
                    </Tooltip>

                  )
                  : (
                    <Tooltip title="Голова домогосподарства">
                      <IconButton onClick={() => Swal.fire({
                        icon: 'warning',
                        title: 'Не можна видалити голову домогосподарства',
                        toast: true,
                        position: 'bottom-start',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                      })}>
                        <StarsIcon color='warning' />
                      </IconButton>
                    </Tooltip>


                  )}

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default FamilyTable