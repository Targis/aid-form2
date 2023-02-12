import Stack from "@mui/material/Stack"
import TelegramIcon from '@mui/icons-material/Telegram';
import FacebookIcon from '@mui/icons-material/Facebook';
import ViberIcon from 'components/layout/ViberIcon';
import { styled } from '@mui/material/styles';
import { NavLink } from "react-router-dom";


const socialItems = [
  {
    label: 'Telegram',
    href: 'https://t.me/ormr_gov_ua',
    Icon: TelegramIcon
  },
  {
    label: 'Viber',
    href: 'https://invite.viber.com/?g2=AQBLGFXNdXOcb0rDex%2BUI2qBn1eYIjwIksHzlPDhAQedVG27RMnWPB%2FEyCsDPAgg',
    Icon: ViberIcon
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/ormr.gov.ua',
    Icon: FacebookIcon
  },
];

const SocialLinks = ({ color = "#000", size = "medium" }) => {
  return (
    <Stack direction="row" spacing={2} sx={{ margin: 'auto' }} justifyContent="center"
      alignItems="center">
      {socialItems.map(({ Icon, label, href }) => (
        <a target="_blank" href={href} title={label} key={label} rel="noreferrer">
          <Icon htmlColor={color} fontSize={size} />
        </a>
      ))}
    </Stack>
  )
}

export default SocialLinks