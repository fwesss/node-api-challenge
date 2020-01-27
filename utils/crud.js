export const getMany = model => async (_req, res) => {
  try {
    const items = await model.get()
    res.status(200).json(items)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'The information could not be retrieved.' })
  }
}

export const getOne = model => async (req, res) => {
  try {
    const item = await model.get(req.params.id)
    if (item) {
      res.status(200).json(item)
    } else {
      res.status(404).json({
        message: 'The item with the specified ID does not exist.',
      })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'The information could not be retrieved.' })
  }
}

export const createOne = model => async (req, res) => {
  try {
    const item = await model.insert(req.body)
    res.status(201).json(item)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'The information could not be posted.' })
  }
}

export const updateOne = model => async (req, res) => {
  try {
    const updated = await model.update(req.params.id)(req.body)
    if (updated) {
      res.status(200).json(updated)
    } else {
      res.status(404).json({
        message: 'The item with the specified ID does not exist.',
      })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'The information could not be modified.' })
  }
}

export const removeOne = model => async (req, res) => {
  try {
    const count = await model.remove(req.params.id)
    if (count) {
      res.status(200).json({ message: `This item has been deleted` })
    } else {
      res.status(404).json({
        message: 'The item with the specified ID does not exist.',
      })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'The information could not be modified.' })
  }
}

export const crudControllers = model => ({
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  getMany: getMany(model),
  getOne: getOne(model),
  createOne: createOne(model),
})
