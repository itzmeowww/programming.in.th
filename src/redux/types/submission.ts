export interface ISubmissionsState {
  readonly submissionsList: ReadonlyArray<ISubmissions>
  readonly status: 'LOADING' | 'SUCCESS'
}

export interface ISubmissions {
  readonly uid: string
  readonly submission_id: string
  readonly username: string
  readonly problem_id: string
  readonly language: string
  readonly status: string
  readonly points: number
  readonly time: number
  readonly memory: number
  readonly timestamp: Date
}