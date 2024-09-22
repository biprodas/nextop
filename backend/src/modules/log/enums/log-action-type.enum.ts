export enum LogActionType {
  Log = 'Log',
  Note = 'Note',
  Read = 'Read',
  Create = 'Create',
  Update = 'Update',
  Remove = 'Remove', // soft-delete. not completely erased. kept in existence
  Delete = 'Delete', // erase completely
  Submit = 'Submit',
  Resolve = 'Resolve',
  Close = 'Close',
  Send = 'Send',
  Forward = 'Forward',
}
