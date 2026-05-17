export interface Lead {
  id: string;
  name: string;
  email: string;
  status: string;
  source: string;
  createdAt: string;
  updatedAt: string | null;
}

export interface CreateLeadRequest {
  name: string;
  email: string;
  status: string;
  source: string;
}

export interface UpdateLeadRequest {
  name: string;
  email: string;
  status: string;
  source: string;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends AuthCredentials {
  name: string;
}
