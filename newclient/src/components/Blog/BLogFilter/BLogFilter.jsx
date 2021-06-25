/* eslint-disable react/prop-types */
import React from 'react';
import Button from '@material-ui/core/Button';

function BLogFilter({ setFilter, search }) {
  return (
    <>
      <Button
        size="small"
        className={
          search === 'Study'
            ? 'multi__search__button active'
            : 'multi__search__button'
        }
        variant="outlined"
        color="secondary"
        onClick={() => setFilter('Study')}
      >
        Study
      </Button>
      <Button
        size="small"
        className={
          search === 'Research'
            ? 'multi__search__button active'
            : 'multi__search__button'
        }
        variant="outlined"
        color="secondary"
        onClick={() => setFilter('Research')}
      >
        Research
      </Button>
      <Button
        size="small"
        className={
          search === 'Adventure'
            ? 'multi__search__button active'
            : 'multi__search__button'
        }
        variant="outlined"
        color="secondary"
        onClick={() => setFilter('Adventure')}
      >
        Adventure
      </Button>
      <Button
        size="small"
        className={
          search === 'Medical'
            ? 'multi__search__button active'
            : 'multi__search__button'
        }
        variant="outlined"
        color="secondary"
        onClick={() => setFilter('Medical')}
      >
        Medical
      </Button>
      <Button
        size="small"
        className={
          search === 'Programming'
            ? 'multi__search__button active'
            : 'multi__search__button'
        }
        variant="outlined"
        color="secondary"
        onClick={() => setFilter('Programming')}
      >
        Programming
      </Button>
      <Button
        size="small"
        className={
          search === 'Reviews'
            ? 'multi__search__button active'
            : 'multi__search__button'
        }
        variant="outlined"
        color="secondary"
        onClick={() => setFilter('Reviews')}
      >
        Reviews
      </Button>
      <Button
        size="small"
        className={
          search === 'All'
            ? 'multi__search__button active'
            : 'multi__search__button'
        }
        variant="outlined"
        color="secondary"
        onClick={() => setFilter('All')}
      >
        All
      </Button>
      {/* </div> */}
    </>
  );
}

export default BLogFilter;
