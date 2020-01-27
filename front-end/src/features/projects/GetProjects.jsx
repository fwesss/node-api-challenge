import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Spinner, Grid } from '@chakra-ui/core'
import { Link } from 'react-router-dom'

const GetProjects = () => {
  const [projects, setProjects] = useState([])
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    axios
      .get('http://localhost:4000/api/projects')
      .then(projects => setProjects(projects.data))
      .catch(error => console.error(error))
      .finally(() => setFetching(false))
  }, [])

  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={6} m={10}>
      {fetching ? (
        <Spinner size="xl" />
      ) : (
        projects.map(project => (
          <Link to={`/projects/${project.id}`} key={project.id}>
            {project.name}
          </Link>
        ))
      )}
    </Grid>
  )
}

export default GetProjects
