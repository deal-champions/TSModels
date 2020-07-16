// TODO: Implement this in the future if we decide to have it.
// export enum PointsCalculationFunction {
//   multiplication,
//   addition
// }

// const PointsFunctionImplementationMap = {
//   [PointsCalculationFunction.multiplication]: (acc: number, val: number) => acc * val,
//   [PointsCalculationFunction.addition]: (acc: number, val: number) => acc + val
// };

// const PointsFunctionAccumulatorInitialValueMap = {
//   [PointsCalculationFunction.multiplication]: 1,
//   [PointsCalculationFunction.addition]: 0
// };

// export class ComplexTermViewpoint extends TermViewpoint<ComplexTerm> {
//   get points(): number {
//     return this.termViewpointsForTerms.reduce(
//       (acc, vp) => PointsFunctionImplementationMap[this.pointsFunction](acc, vp.points),
//       PointsFunctionAccumulatorInitialValueMap[this.pointsFunction]
//     );
//   }

//   /**
//    * A list of [TermViewpoint]s, which must be associated with the DealTerms from the
//    * `ComplexTerm`. The order must be the same as well.
//    */
//   readonly termViewpointsForTerms: TermViewpoint<DealTerm>[] = [];

//   /** The function to use when calculating the points from individual complex terms */
//   readonly pointsFunction: PointsCalculationFunction = PointsCalculationFunction.addition;

//   constructor(
//     dealTerm?: ComplexTerm,
//     termViewpointsForTerms?: TermViewpoint<DealTerm>[],
//     pointsFunction?: PointsCalculationFunction
//   ) {
//     super(dealTerm);
//     if (!dealTerm || !termViewpointsForTerms || !pointsFunction) {
//       Logger.warnUninitializedClass();
//       return;
//     }
//     for (let i = 0; i < dealTerm.terms.length; i++) {
//       if (termViewpointsForTerms[i].dealTerm !== dealTerm.terms[i]) {
//         throw TypeError(
//           'The order of TermViewpoints and their associated DealTerms must match the order of the DealTerms inside the Complex Term'
//         );
//       }
//     }
//     this.pointsFunction = pointsFunction;
//     this.termViewpointsForTerms = termViewpointsForTerms;
//   }
// }
