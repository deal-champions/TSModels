/**
 * This is a DealTerm that consists of many child dealterms.
 * It's value is an array of the values of all the dealterms
 */
// TODO: Implement the Complex Term logic. The main problem is the serialization of terms property.
// we need to implement a custom converter or something like this.
// @JsonObject('ComplexTerm')
// export class ComplexTerm extends DealTerm<(string | number | null)[]> {
//   /** List of all the child dealterms */
//   @JsonProperty('terms')
//   readonly terms: (NumberTerm | ListTerm)[] = [];

//   constructor(terms?: (NumberTerm | ListTerm)[], userFriendlyName?: string, isRequired?: boolean) {
//     super(userFriendlyName, isRequired);
//     this.terms = terms ;
//   }

//   /** A List of all the values of the child dealterms. */
//   get value(): (string | number | null)[] {
//     return this.terms.map(t => t.value);
//   }
// }
