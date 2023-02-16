import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import { alpha, styled } from '@mui/material/styles';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import FuseNavBadge from '../../FuseNavBadge';
import FuseSvgIcon from '../../../FuseSvgIcon';

const Root = styled(ListItem)(({ theme, ...props }) => ({
  minHeight: 44,
  width: '100%',
  padding: 30,
  color: alpha(theme.palette.text.primary, 0.7),
  cursor: 'pointer',
  textDecoration: 'none!important',
  '&:hover': {
    color: theme.palette.text.primary,
    '& > .fuse-list-item-icon': {
      color: 'white',
    },
    cursor: 'pointer',
  },
  '&.active': {
    color: theme.palette.text.primary,
    backgroundColor: '#E88532',
    pointerEvents: 'none',
    transition: 'border-radius .15s cubic-bezier(0.4,0.0,0.2,1)',
    '& > .fuse-list-item-text-primary': {
      color: 'red',
    },
    '& > .fuse-list-item-icon': {
      color: 'white',
    },
  },
  '&.fuse-list-item': {},
  '& >.fuse-list-item-icon': {
    color: '#E88532',
    flexGrow: 1,
  },
  '& > .fuse-list-item-text': {},
}));

function FuseNavVerticalItem(props) {
  const { item, nestedLevel, onItemClick } = props;

  const itempadding = nestedLevel > 0 ? 38 + nestedLevel * 16 : 16;

  return useMemo(
    () => (
      <Root
        button
        component={NavLinkAdapter}
        to={item.url || ''}
        activeClassName={item.url ? 'active' : ''}
        className={clsx('fuse-list-item', item.active && 'active')}
        onClick={() => onItemClick && onItemClick(item)}
        end={item.end}
        itempadding={itempadding}
        role="button"
        sx={item.sx}
        disabled={item.disabled}
      >
        {item.icon && (
          <FuseSvgIcon
            className={clsx('fuse-list-item-icon', item.iconClass)}
            color="action"
            size={34}
          >
            {item.icon}
          </FuseSvgIcon>
        )}

        {/* <ListItemText
          className="fuse-list-item-text"
          primary={item.title}
          secondary={item.subtitle}
          classes={{
            primary: 'text-13 font-medium fuse-list-item-text-primary truncate',
            secondary: 'text-11 font-medium fuse-list-item-text-secondary leading-normal truncate',
          }}
        /> */}
        {item.badge && <FuseNavBadge badge={item.badge} />}
      </Root>
    ),
    [item, itempadding, onItemClick]
  );
}

FuseNavVerticalItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    icon: PropTypes.string,
    url: PropTypes.string,
  }),
};

FuseNavVerticalItem.defaultProps = {};

const NavVerticalItem = FuseNavVerticalItem;

export default NavVerticalItem;
