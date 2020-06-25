export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  me?: Maybe<User>;
  movies: Array<Movie>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
};

export type Movie = {
  __typename?: 'Movie';
  id: Scalars['Int'];
  title: Scalars['String'];
  minutes: Scalars['Int'];
  ownerId: Scalars['Int'];
  owner: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: User;
  register: User;
  confirmUser: Scalars['Boolean'];
  changePassword?: Maybe<User>;
  forgotPassword: Scalars['Boolean'];
  login?: Maybe<User>;
  createMovie: Movie;
  updateMovie: Scalars['Boolean'];
  deleteMovie: Scalars['Boolean'];
  logout: Scalars['Boolean'];
};


export type MutationCreateUserArgs = {
  data: RegisterInput;
};


export type MutationRegisterArgs = {
  data: RegisterInput;
};


export type MutationConfirmUserArgs = {
  token: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  data: ChangePasswordInput;
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationCreateMovieArgs = {
  options: MovieInput;
};


export type MutationUpdateMovieArgs = {
  input: MovieUpdateInput;
  id: Scalars['Int'];
};


export type MutationDeleteMovieArgs = {
  id: Scalars['Int'];
};

export type RegisterInput = {
  password: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
};

export type ChangePasswordInput = {
  password: Scalars['String'];
  token: Scalars['String'];
};

export type MovieInput = {
  title: Scalars['String'];
  minutes: Scalars['Int'];
};

export type MovieUpdateInput = {
  title?: Maybe<Scalars['String']>;
  minutes?: Maybe<Scalars['Int']>;
};

export type PasswordInput = {
  password: Scalars['String'];
};

export type Unnamed_1_QueryVariables = Exact<{ [key: string]: never; }>;


export type Unnamed_1_Query = (
  { __typename?: 'Query' }
  & { movies: Array<(
    { __typename?: 'Movie' }
    & Pick<Movie, 'id' | 'ownerId' | 'title'>
    & { owner: (
      { __typename?: 'User' }
      & Pick<User, 'name'>
    ) }
  )> }
);
