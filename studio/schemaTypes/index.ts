import {caseStudy} from './documents/caseStudy'

import {beforeAfter} from './objects/beforeAfter'
import {comparisonSide} from './objects/comparisonSide'
import {designDecision} from './objects/designDecision'
import {discovery} from './objects/discovery'
import {keyDecisions} from './objects/keyDecisions'
import {portableText} from './objects/portableText'
import {portfolioSettings} from './objects/portfolioSettings'
import {processHook} from './objects/processHook'
import {projectContext} from './objects/projectContext'
import {projectFinding} from './objects/projectFinding'
import {projectImage} from './objects/projectImage'
import {projectStat} from './objects/projectStat'
import {seo} from './objects/seo'
import {solution} from './objects/solution'

export const schemaTypes = [
  // Documents
  caseStudy,

  // Objects
  portableText,
  projectImage,
  comparisonSide,
  beforeAfter,
  projectStat,
  projectFinding,
  designDecision,
  projectContext,
  processHook,
  solution,
  discovery,
  keyDecisions,
  portfolioSettings,
  seo,
]
