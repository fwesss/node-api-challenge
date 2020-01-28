import React, { useState, useEffect } from 'react'
import { useRouteMatch } from 'react-router-dom'
import axios from 'axios'
import { Spinner, Checkbox, Flex, Text } from '@chakra-ui/core'

const ViewProject = () => {
  const {
    params: { id },
  } = useRouteMatch('/projects/:id')

  const [project, setProject] = useState(null)
  const [fetching, setFetching] = useState(true)
  const [completed, setCompleted] = useState(null)

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/projects/${id}`)
      .then(project => {
        setProject(project.data)
        setCompleted(project.data.completed)
      })
      .catch(error => console.error(error))
      .finally(() => setFetching(false))
  }, [id])

  return fetching ? (
    <Spinner size="xl" />
  ) : (
    <Flex direction="column">
      <Text fontWeight="bold">{project.name}</Text>
      <Text>{project.description}</Text>
      <Checkbox isChecked={completed} onChange={() => setCompleted(!completed)}>
        Completed?
      </Checkbox>
    </Flex>
  )
}

export default ViewProject
