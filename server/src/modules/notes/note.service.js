import Note from '../../models/Note.js'

export class NoteService {
  static async getAll(filters = {}) {
    return await Note.find(filters)
      .populate('lead', 'firstName lastName')
      .populate('customer', 'firstName lastName')
      .populate('deal', 'title')
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 })
  }

  static async getById(id) {
    return await Note.findById(id)
      .populate('lead', 'firstName lastName')
      .populate('customer', 'firstName lastName')
      .populate('deal', 'title')
      .populate('createdBy', 'name email')
  }

  static async create(noteData, userId) {
    const note = new Note({
      ...noteData,
      createdBy: userId,
    })
    await note.save()
    await note.populate('lead', 'firstName lastName')
    await note.populate('customer', 'firstName lastName')
    await note.populate('deal', 'title')
    await note.populate('createdBy', 'name email')
    return note
  }

  static async update(id, updateData) {
    const note = await Note.findByIdAndUpdate(id, updateData, { new: true })
      .populate('lead', 'firstName lastName')
      .populate('customer', 'firstName lastName')
      .populate('deal', 'title')
      .populate('createdBy', 'name email')
    return note
  }

  static async delete(id) {
    return await Note.findByIdAndDelete(id)
  }
}
