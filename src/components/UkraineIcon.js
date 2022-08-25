import SvgIcon from '@mui/material/SvgIcon'

const UkraineIcon = (props) => {
  return (
    <SvgIcon
      viewBox="0 0 512 512"
      style={{ enableBackground: 'new 0 0 512 512' }}
      {...props}
    >
      <path
        style={{ fill: '#FFE15A' }}
        d="M0,385.379c0,21.177,17.167,38.345,38.345,38.345h435.31c21.177,0,38.345-17.167,38.345-38.345V256H0
	V385.379z"
      />
      <path
        style={{ fill: '#4173CD' }}
        d="M473.655,88.276H38.345C17.167,88.276,0,105.443,0,126.621V256h512V126.621
	C512,105.443,494.833,88.276,473.655,88.276z"
      />
    </SvgIcon>
  )
}

export default UkraineIcon
