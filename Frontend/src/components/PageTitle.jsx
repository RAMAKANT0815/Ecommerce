import React, { use } from 'react'
import { useEffect } from 'react'

function PageTitle({ title }) {
    useEffect(() => {
        document.title = title;
    }, [title]);
  return (
    <div>
      <h1>{title}</h1>
    </div>
  )
}

export default PageTitle
