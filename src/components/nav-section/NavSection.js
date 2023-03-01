import { useContext } from 'react';
import PropTypes from 'prop-types';
import { NavLink as RouterLink } from 'react-router-dom';
// @mui
import { Box, List, ListItemText, Switch } from '@mui/material';
//
import { StyledNavItem, StyledNavItemIcon } from './styles';
import { RTLContext } from '../../context/RTLContext';

// ----------------------------------------------------------------------

NavSection.propTypes = {
  data: PropTypes.array,
};

export default function NavSection({ data = [], ...other }) {
  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {data.filter((i) => i.stage).map((item) => (
          <NavItem key={item.title} item={item} />
        ))}
        <ToggleDirection />
      </List>
    </Box>
  );
}

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
};

function NavItem({ item }) {
  const { isRTL } = useContext(RTLContext);
  const { title, path, icon, info } = item;

  return (
    <StyledNavItem
      component={RouterLink}
      to={path}
      sx={{
        textAlign: isRTL ? 'right' : 'left',
        '&.active': {
          color: 'text.primary',
          bgcolor: 'action.selected',
          fontWeight: 'fontWeightBold',
        },
      }}
    >
      <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>

      <ListItemText disableTypography primary={title} />

      {info && info}
    </StyledNavItem>
  );
}

function ToggleDirection() {
  const { onToggle, isRTL } = useContext(RTLContext);

  return (
    <StyledNavItem
      component="label"
      htmlFor="RTL"
      sx={{
        mt: 2,
        textAlign: isRTL ? 'right' : 'left',
        bgcolor: 'action.selected',
        fontWeight: 'fontWeightBold',
        color: 'text.primary',
      }}
    >
      <StyledNavItemIcon />

      <ListItemText  disableTypography primary="RTL" />

      <Switch id="RTL" checked={isRTL} onChange={onToggle} />
    </StyledNavItem>
  );
}
