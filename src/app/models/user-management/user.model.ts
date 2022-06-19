export interface User 
{
  id: number,
  enabled: boolean,
  username: string,
  email: string,
  firstname: string,
  lastname: string,
  groupPosition: string,
  firstTimeLoginRemaining: boolean,
  accountNonExpired: boolean,
  accountNonLocked: boolean,
  credentialsNonExpired: boolean,
  deleted: boolean
}