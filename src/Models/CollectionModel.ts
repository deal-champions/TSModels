/**
 * This model represents a model which is a Firebase Collection.
 */
export interface CollectionModel {
  /**
   * In Collections, the ID will not be contained inside of object itself.
   * Instead the ID will be the doc reference's id so you need to do something like:
   * var model = doc.data();
   * model.id = doc.id;
   */
  id?: string;
}
